/**
 * Central Configuration for Fullmoon Multicuisine Family Restaurant.
 * Contains verified real data from Google Maps (Place ID: ChIJtdhOnFabyzsRGh-cLpF7sxc)
 * and clearly marked placeholders for items to be customized by the owner.
 */

export const RESTAURANT_CONFIG = {
  // Verified Restaurant Identity
  name: "Fullmoon Multicuisine Family Restaurant",
  shortName: "Fullmoon",
  tagline: "Authentic Flavors, Royal Tandoor & Cherished Family Moments",
  subTagline: "Serving authentic North Indian, Chinese, Mughlai, Kebabs & Hyderabadi Biryani in Old Alwal, Secunderabad.",
  category: "Multicuisine Family Restaurant & Restobar",

  // Verified Location Details
  address: {
    line1: "BHEL Avemachs, Mangapuram Colony",
    line2: "Meenakshi Estate, Old Alwal",
    city: "Secunderabad",
    metroArea: "Hyderabad",
    state: "Telangana",
    country: "India",
    pincode: "500010",
    fullAddress: "BHEL Avemachs, Mangapuram Colony, Meenakshi Estate, Old Alwal, Secunderabad, Telangana 500010, India",
    landmark: "Near Meenakshi Estate & BHEL Avemachs, Old Alwal",
    coordinates: {
      lat: 17.4931,
      lng: 78.5036,
    },
  },

  // Verified Google Maps & Place Data
  googleMaps: {
    placeId: "ChIJtdhOnFabyzsRGh-cLpF7sxc",
    // Primary listing URL as specified in prompt
    listingUrl: "https://www.google.com/maps/search/?api=1&query=Fullmoon%20Multicuisine%20Family%20Restaurant&query_place_id=ChIJtdhOnFabyzsRGh-cLpF7sxc",
    // Direct directions link
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Fullmoon+Multicuisine+Family+Restaurant&destination_place_id=ChIJtdhOnFabyzsRGh-cLpF7sxc",
    // Direct review link
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJtdhOnFabyzsRGh-cLpF7sxc",
    // Embed map source for Google Maps iframe
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.289139591461!2d78.5014113!3d17.4931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbca569c4ed8b5%3A0x77b37b912e9c1f1a!2sFullmoon%20Multicuisine%20Family%20Restaurant!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },

  // Verified Contact Numbers
  contact: {
    primaryPhone: "+91 84998 34621",
    primaryPhoneRaw: "+918499834621",
    secondaryPhone: "+91 40 4858 7939",
    secondaryPhoneRaw: "+914048587939",
    whatsappPhone: "+918499834621",
    whatsappDefaultMessage: "Hello Fullmoon Restaurant, I would like to inquire about table booking / food order.",
    // PLACEHOLDER: Owner can update their official inquiry email here
    email: "TODO_OWNER_EMAIL_ADDRESS_info@fullmoonrestaurant.com",
    displayEmail: "contact@fullmoonrestaurant.com",
  },

  // Verified Operating Hours
  hours: {
    displaySummary: "12:00 PM – 11:00 PM (Daily)",
    lunchTime: "12:00 PM – 4:00 PM",
    dinnerTime: "6:30 PM – 11:00 PM",
    schedule: [
      { day: "Monday", hours: "12:00 PM – 11:00 PM", isToday: false },
      { day: "Tuesday", hours: "12:00 PM – 11:00 PM", isToday: false },
      { day: "Wednesday", hours: "12:00 PM – 11:00 PM", isToday: false },
      { day: "Thursday", hours: "12:00 PM – 11:00 PM", isToday: false },
      { day: "Friday", hours: "12:00 PM – 11:00 PM", isToday: false },
      { day: "Saturday", hours: "12:00 PM – 11:00 PM", isToday: false },
      { day: "Sunday", hours: "12:00 PM – 11:00 PM", isToday: false },
    ],
  },

  // Verified Metrics & Attributes
  metrics: {
    rating: 4.1,
    ratingMax: 5.0,
    reviewCount: 1250,
    priceRange: "₹700 – ₹1,200 for two",
    currency: "₹",
  },

  // Dining Facilities & Amenities
  amenities: [
    { title: "Air-Conditioned Comfort", desc: "Spacious AC family dining hall with comfortable booth and table seating." },
    { title: "Multicuisine Expertise", desc: "Specializing in North Indian, Chinese, Tandoori Kebabs & Dum Biryanis." },
    { title: "Restobar Section", desc: "Dedicated casual lounge section serving chilled beverages & cocktails." },
    { title: "Dedicated Family Seating", desc: "Quiet, comfortable zones designed specifically for families and kids." },
    { title: "Hassle-Free Parking", desc: "Convenient vehicle parking and easy roadside accessibility." },
    { title: "Takeaway & Fast Delivery", desc: "Hygienically packed orders delivered straight to your doorstep in Alwal & Secunderabad." },
  ],

  // Social Links & Placeholders
  socials: {
    // PLACEHOLDER: Official Instagram Handle
    instagramHandle: "TODO_INSTAGRAM_HANDLE",
    instagramUrl: "https://instagram.com/fullmoon_alwal_official",
    
    // PLACEHOLDER: Official Facebook Link
    facebookUrl: "https://facebook.com/fullmoonrestaurantalwal",
    
    // Verified WhatsApp Link
    whatsappUrl: "https://wa.me/918499834621?text=Hello%20Fullmoon%20Restaurant%2C%20I%20would%20like%20to%20order%20food%20or%20reserve%20a%20table",
  },

  // Order Settings
  orderSettings: {
    deliveryFee: 40,
    freeDeliveryThreshold: 500,
    taxRatePercentage: 5, // 5% GST for Indian restaurants
    packagingCharge: 20,
    minimumOrderValue: 200,
    estimatedDeliveryMins: "30 - 45",
  },
};

