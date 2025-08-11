import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { ElearningCourseDetailsLessonItem } from './elearning-course-details-lesson-item';
import { ElearningCourseDetailsLessonsDialog } from './elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export function ElearningCourseDetailsLessonList({ lessons }) {
  const videoPlay = useBoolean();

  const [expanded, setExpanded] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleReady = useCallback(() => {
    setTimeout(() => videoPlay.onTrue(), 500);
  }, [videoPlay]);

  const handleSelectedLesson = useCallback((lesson) => {
    if (lesson.unLocked) {
      setSelectedLesson(lesson);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelectedLesson(null);
    videoPlay.onFalse();
  }, [videoPlay]);

  const handleExpandedLesson = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const renderList = () => (
    <>
      {lessons.map((lesson) => (
        <ElearningCourseDetailsLessonItem
          key={lesson.id}
          lesson={lesson}
          expanded={expanded === lesson.id}
          onExpanded={handleExpandedLesson(lesson.id)}
          selected={selectedLesson?.id === lesson.id}
          onSelected={() => {
            handleSelectedLesson(lesson);
          }}
        />
      ))}

      <Divider />
    </>
  );

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Lessons
      </Typography>

      {renderList()}

      <ElearningCourseDetailsLessonsDialog
        lessons={lessons}
        selectedLesson={selectedLesson}
        onSelectedLesson={(lesson) => setSelectedLesson(lesson)}
        open={!!selectedLesson?.unLocked}
        onClose={handleClose}
        playing={videoPlay.value}
        onReady={handleReady}
        onEnded={videoPlay.onFalse}
        onPlay={videoPlay.onTrue}
        onPause={videoPlay.onFalse}
      />
    </div>
  );
}
