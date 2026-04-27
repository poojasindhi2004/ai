const API = process.env.NEXT_PUBLIC_API_URL;
console.log("API URL:", API);
export const sendOtp = async (email) =>{
    const res = await fetch("https://test-q6ja.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "otp-send failed");
    }
    return data;
}