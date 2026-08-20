const WHATSAPP_NUMBER = "919643940236";

export const slugify = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");


// ======= CLASS ENQUIRY REDIRECT MESSAGE =======
export const classEnrollRedirect = ({ classLink = "", className, ageGroup, days, timings, fee }) => {
    const linkLine = classLink ? `\n*Link: ${classLink}*` : "";
    const message = `Hello Raskrti Art,
    
I would like to enroll in the following class:

*Class: ${className}*
• Age Group: ${ageGroup}
• Days: ${days}
• Timings: ${timings}
• Fee: ₹${fee}${linkLine}

Please share further details regarding enrollment.

Thank you!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};




// ======= COURSE ENQUIRY REDIRECT MESSAGE =======
export const courseEnrollRedirect = ({ courseLink = "", courseName, ageGroup, days, timings, fee }) => {
    const linkLine = courseLink ? `\n*Link: ${courseLink}*` : "";
    const message = `Hello Raskrti Art,
    
I would like to enroll in the following certificate course:

*Course: ${courseName}*
• Age Group: ${ageGroup}
• Days: ${days}
• Timings: ${timings}
• Fee: ₹${fee}${linkLine}

Please share further details regarding enrollment.

Thank you!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};



// ======= BUY PRODUCT REDIRECT MESSAGE =======
export const buyProductRedirect = ({ productLink = "", productName, price }) => {
    const linkLine = productLink ? `\n*Link: ${productLink}*` : "";
    const message = `Hello Raskrti Art,

I would like to buy the following product:

*Product: ${productName}*${linkLine}
*Price: ₹${price}*

Please confirm availability and provide further details.

Thank you!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};