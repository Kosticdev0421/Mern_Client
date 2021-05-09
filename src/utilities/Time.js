export function displayTime(givenTime) {
    
    if (!givenTime) return "Unknown";
    const time = Math.floor(givenTime / (60 * 60 * 1000));

    const now = Math.floor(new Date().getTime() / (60 * 60 * 1000));
    if(time > now - 1) return "Just now";
    if(time > now - 6) return "Few hours";
    if(time > now - 24) return "Today";
    if(time > now - 48) return "1 Day";
    if(time > now - 72) return "2 Days";
    if(time > now - 96) return "3 Days";

    return new Date(givenTime).toLocaleDateString();
}
