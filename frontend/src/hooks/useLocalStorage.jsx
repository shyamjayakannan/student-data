export default function useLocalStorage() {
    function updatePersonalDetails(data) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem("PersonalDetails", JSON.stringify(data));
    }

    function fetchPersonalDetails() {
        if (typeof localStorage === "undefined") return;
        const data = localStorage.getItem("PersonalDetails");
        const response = JSON.parse(data);
        return response;
    }

    function removePersonalDetails() {
        if (typeof localStorage === "undefined") return;
        localStorage.removeItem("PersonalDetails");
    }
    
    return {
        updatePersonalDetails,
        fetchPersonalDetails,
        removePersonalDetails,
    };
};