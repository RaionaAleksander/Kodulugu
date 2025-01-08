document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("js__password__form");
    const errorMessageSpan = document.querySelector(".js__my-error-message");

    const clientCode = document.getElementById("clientCode").value;
    const sessionKey = document.getElementById("sessionKey").value;

    form.addEventListener("submit", async function (event) { 
        event.preventDefault();

        const oldPassword = form.querySelector(".js__OldPassword").value.trim();
        const newPassword = form.querySelector(".js__changePasswordAutomationPassword").value.trim();
        const confirmPassword = form.querySelector(".js__changePasswordAutomationPasswordConfirm").value.trim();

        errorMessageSpan.textContent = "";

        if (newPassword !== confirmPassword) {
            errorMessageSpan.textContent = "New password and confirm password must match!";
            return;
        };

        if (newPassword === oldPassword) {
            errorMessageSpan.textContent = "The new password must not be the same as your old password!";
            return;
        }

        try {
            const response = await fetch("v1/user/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "clientCode": clientCode,
                    "sessionKey": sessionKey
                },
                body: JSON.stringify({
                    "newPassword": newPassword,
                    "oldPassword": oldPassword
                })
            });

            if (response.ok) {
                alert("Password changed successfully!");
                form.reset();
            } else if (response.status === 404) {
                errorMessageSpan.textContent = "URL not found. Please check the API endpoint.";
            } else {
                const errorData = await response.json();
                errorMessageSpan.textContent = errorData.message || "An error occurred!";
            }
        } catch (error) {
            errorMessageSpan.textContent = "Failed to change password. Please try again later.";
            console.error("Error:", error);
        }
    });
});
