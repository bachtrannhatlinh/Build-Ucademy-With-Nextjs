  // Convert MongoDB documents to plain objects
  export const convertToPlainObject = (doc: any) => {
    if (!doc) return null;
    
    // Convert MongoDB document to plain object
    const plainObj = JSON.parse(JSON.stringify(doc));
    
    // Ensure _id is a string
    if (plainObj._id) {
      plainObj._id = plainObj._id.toString();
    }
    
    // Ensure course is a string
    if (plainObj.course) {
      plainObj.course = plainObj.course.toString();
    }
    
    // Ensure lecture is a string
    if (plainObj.lecture) {
      plainObj.lecture = plainObj.lecture.toString();
    }
    
    return plainObj;
  };