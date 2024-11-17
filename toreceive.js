document.addEventListener("DOMContentLoaded", () => {
    const productDetailsTableBody = document.getElementById("productDetailsTable").querySelector("tbody");

    // Retrieve the approved product details from localStorage
    const approvedProduct = JSON.parse(localStorage.getItem("approvalData"));

    if (!approvedProduct) {
        alert("No approved product data found.");
        return;
    }

    // Display the product details on the order page
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${approvedProduct.name}</td>
        <td>${approvedProduct.quantity}</td>
        <td>₱${approvedProduct.price}</td>
        <td>₱${(approvedProduct.price * approvedProduct.quantity).toFixed(2)}</td>
        <td>
            <button class="action-btn received">Order Received</button>
            <button class="action-btn returned">Returned</button>
        </td>
    `;

    productDetailsTableBody.appendChild(row);

    // Event listener for Order Received button
    row.querySelector(".received").addEventListener("click", () => {
        alert("Order marked as received.");

        const currentUser = localStorage.getItem("currentUser"); // Replace this with the logic to fetch the current user
        const salesHistoryKey = currentUser + "_salesHistory";

        // Get existing sales history from localStorage or initialize as an empty array
        const salesHistory = JSON.parse(localStorage.getItem(salesHistoryKey)) || [];

        // Create a new sale entry
        const newSale = {
            orderId: `ORD${Date.now()}`, // Unique order ID based on timestamp
            date: new Date().toLocaleString(), // Record the date and time
            products: [approvedProduct],
            totalAmount: (approvedProduct.price * approvedProduct.quantity).toFixed(2),
        };

        // Add the new sale to the sales history array
        salesHistory.push(newSale);

        // Save the updated sales history back to localStorage
        localStorage.setItem(salesHistoryKey, JSON.stringify(salesHistory));

        // Remove the approved product from localStorage after marking it as received
        localStorage.removeItem("approvedProduct");

        // Redirect to the purchase history page
        window.location.href = "purchaseHistory.html"; // Adjust the path as needed
    });

    // Event listener for Order Returned button
    row.querySelector(".returned").addEventListener("click", () => {
        alert("Order marked as returned.");
        // Additional logic for handling returned orders can be implemented here
    });
});
