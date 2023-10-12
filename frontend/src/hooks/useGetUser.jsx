export default function useGetUser() {
    async function getUser(data) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getUser`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const responsedata = await response.json();
            return responsedata;
        } catch (err) {
            console.log(err);
        }
    }

    return getUser;
}