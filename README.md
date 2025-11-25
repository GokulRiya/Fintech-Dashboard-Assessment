**1. Clone the Project**
git clone https://github.com/<your-username>/finedge-dashboard.git

**2. Install Dependencies**
npm install

**3. Start the Angular Application**
ng serve

**4. Start JSON Server**
npx json-server --watch db.json --port 3000

**5. Login Credentials**
Email: test@finedge.com  
Password: 123456  

**6. After Login – Dashboard Page**
When login is successful:
✔ You will be redirected to /dashboard

**Dashboard contains:**
Summary Cards
Total Balance
Total Transactions
Pending Transfers

**7. Navigate Through the App**

**Transactions Page**
Click “Transactions” card

You can:
View all transactions
Add new transaction
Search by date/type/status

**Transfers Page**
Click “Transfers” from sidebar/menu → /transfers

You can:
Create transfer
View all transfers
Update status (Completed / Failed)

**8. Logout**
Click the Logout button in the header to return to login page.
