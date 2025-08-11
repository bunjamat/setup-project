import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

// ส่วนนี้เป็นการตั้งค่าตัวแปรและ options สำหรับการดึงข้อมูล sale (หรือ calendar ในตัวอย่างนี้) ด้วย SWR
// 1. enableServer: กำหนดว่าจะให้ทำงานกับ server จริงหรือไม่ (false = ทำงานแบบ local/mock เท่านั้น)
// 2. CALENDAR_ENDPOINT: กำหนด endpoint สำหรับเรียก API (ดึงมาจาก endpoints.calendar)
// 3. swrOptions: กำหนด options สำหรับ SWR ว่าจะให้ revalidate (ดึงข้อมูลใหม่) ในกรณีต่างๆ หรือไม่ โดยขึ้นกับค่า enableServer

const enableServer = true; // ถ้า true จะให้ทำงานกับ server จริง

const SALE_ENDPOINT = "/api/sale/list"; // endpoint สำหรับเรียกข้อมูล sale list
const SALE_DELETE_ENDPOINT = "/api/sale/delete"; // endpoint สำหรับลบข้อมูลแบบกลุ่ม

const swrOptions = {
  revalidateIfStale: enableServer,         // ถ้า enableServer เป็น true จะ revalidate เมื่อข้อมูลเก่า
  revalidateOnFocus: enableServer,         // ถ้า enableServer เป็น true จะ revalidate เมื่อหน้าจอถูก focus
  revalidateOnReconnect: enableServer,     // ถ้า enableServer เป็น true จะ revalidate เมื่อเชื่อมต่อใหม่
};

// ----------------------------------------------------------------------

export function useGetSale() {

    // ดึงข้อมูล sale จาก server ด้วย SWR
  const { data, isLoading, error, isValidating } = useSWR(`${SALE_ENDPOINT}?branch_code=GH-101`, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(() => {
    return {
      sale: data?.data || [],
      saleLoading: isLoading,
      saleError: error,
      saleValidating: isValidating,
      saleEmpty: !isLoading && !isValidating && !data?.data?.length,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createEvent(eventData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventData };
    await axios.post(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */
  mutate(
    CALENDAR_ENDPOINT,
    (currentData) => {
      const currentEvents = currentData?.events;

      const events = [...currentEvents, eventData];

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateEvent(eventData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventData };
    await axios.put(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */
  mutate(
    CALENDAR_ENDPOINT,
    (currentData) => {
      const currentEvents = currentData?.events;

      const events = currentEvents.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteEvent(eventId) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventId };
    await axios.patch(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */
  mutate(
    CALENDAR_ENDPOINT,
    (currentData) => {
      const currentEvents = currentData?.events;

      const events = currentEvents.filter((event) => event.id !== eventId);

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function saveDeletedSales(saleIds = [], { branchCode = 'GH-101' } = {}) {
  if (!Array.isArray(saleIds) || saleIds.length === 0) return;

  const key = `${SALE_ENDPOINT}?branch_code=${branchCode}`;

  // ทำงานกับ server จริง
  if (enableServer) {
    const payload = { saleids: saleIds, branch_code: branchCode };
    await axios.post(SALE_DELETE_ENDPOINT, payload);
    // revalidate
    await mutate(key);
    return;
  }

  // ทำงานแบบ local: อัปเดต cache ของ SWR ให้ลบรายการที่เลือกออก
  mutate(
    key,
    (current) => {
      const currentRows = current?.data || [];
      const selectedSet = new Set(saleIds.map(String));
      const data = currentRows.filter((row) => !selectedSet.has(String(row.saleid)));
      return { ...current, data };
    },
    false
  );
}
