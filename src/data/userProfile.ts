export type UserProfile = {
    userID: string;
    
    // Contact
    email: string;
    phoneNumber?: string;

    // Basic
    profilePic: string;
    age?: number;
    gender?: "Male" | "Female" | "Other";
    name?: string;

    // University
    universityName?: string;
    graduationYear?: number;

    // Lifestyle
    drinkFrequency?: string;
    smoker?: string;
    sleepHours?: string;

    // Other
    description?: string;
    hobbies?: string[];
  };
  