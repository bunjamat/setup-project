'use client';

import {
  _brands,
  _courses,
  _members,
  _coursePosts,
  _testimonials,
  _coursesByCategories,
} from 'src/_mock';

import { ElearningTeam } from '../elearning-team';
import { ElearningNewsletter } from '../elearning-newsletter';
import { ElearningOurClients } from '../elearning-our-clients';
import { ElearningTestimonial } from '../elearning-testimonial';
import { ElearningDownloadApp } from '../elearning-download-app';
import { ElearningLatestPosts } from '../posts/elearning-latest-posts';
import { ElearningLandingHero } from '../landing/elearning-landing-hero';
import { ElearningLandingIntroduce } from '../landing/elearning-landing-introduce';
import { ElearningLandingCategories } from '../landing/elearning-landing-categories';
import { ElearningLandingFeaturedCourses } from '../landing/elearning-landing-featured-courses';
import { ElearningAboutHero } from '../about/elearning-about-hero';
import { ElearningAboutCoreValues } from '../about/elearning-about-core-values';

// ----------------------------------------------------------------------

const latestPosts = _coursePosts.slice(3, 6);

// ----------------------------------------------------------------------

export function ElearningLandingView() {
  return (
    <>
      <ElearningLandingHero />
      <ElearningLandingCategories categories={_coursesByCategories} />
      <ElearningAboutHero />
    

      {/* <ElearningOurClients brands={_brands} /> */}

      {/* <ElearningLandingIntroduce /> */}

      <ElearningLandingFeaturedCourses courses={_courses} />



      <ElearningTeam members={_members.slice(0, 4)} />

      <ElearningTestimonial testimonials={_testimonials} />

      <ElearningLatestPosts posts={latestPosts} />

      {/* <ElearningDownloadApp /> */}

      {/* <ElearningNewsletter /> */}
    </>
  );
}
