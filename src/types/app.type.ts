import { LectureItemData } from './lecture.type';
import  { CourseModelProps } from './models';
import { UserItemData } from './user.type';

// export interface RatingItemData
//   extends Omit<RatingModelProps, 'course' | 'user'> {
//   course: CourseItemData;
//   user: UserItemData;
// }

// export interface CourseItemData
//   extends Omit<CourseModelProps, 'lectures' | 'rating'> {
//   lectures: LectureItemData[];
//   rating: RatingItemData[];
// }
// export interface CouponItemData extends Omit<CouponModelProps, 'courses'> {
//   courses: CourseItemData[];
// }

export interface CourseItemData
  extends Omit<CourseModelProps, 'lectures'> {
  lectures: LectureItemData[];
}
