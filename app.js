let web3; // Đối tượng Web3
let accounts = []; // Danh sách tài khoản

const connectButton = document.getElementById('connectButton');
const statusText = document.getElementById('status');
const accountsList = document.getElementById('accountsList');

// Kết nối MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        try {
            // Yêu cầu kết nối MetaMask và mở ví
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);

            // Lấy danh sách tài khoản từ MetaMask
            accounts = await web3.eth.getAccounts();
            updateStatus('MetaMask Connected');
            renderAccounts();
        } catch (error) {
            console.error('Connection rejected:', error);
            updateStatus('Connection rejected');
        }
    } else {
        alert('MetaMask is not installed! Please install MetaMask and try again.');
        updateStatus('MetaMask not found');
    }
}

// Cập nhật trạng thái
function updateStatus(message) {
    statusText.textContent = message;
    // Kiểm tra nếu thông báo là "MetaMask Connected" để thay đổi màu sắc
    if (message === 'MetaMask Connected') {
        statusText.classList.add('success');
    } else {
        statusText.classList.remove('success');
    }
}


// Hiển thị danh sách tài khoản
function renderAccounts() {
    accountsList.innerHTML = ''; // Xóa danh sách cũ

    accounts.forEach((account, index) => {
        const listItem = document.createElement('li');

        const accountText = document.createElement('span');
        accountText.textContent = `Account ${index + 1}: ${account}`;
        listItem.appendChild(accountText);

        // Thêm nút xóa
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => deleteAccount(index));
        listItem.appendChild(deleteButton);

        accountsList.appendChild(listItem);
    });
}

// Xóa tài khoản theo index
function deleteAccount(index) {
    accounts.splice(index, 1); // Xóa tài khoản khỏi danh sách
    renderAccounts(); // Cập nhật lại giao diện
}

// Gán sự kiện
connectButton.addEventListener('click', connectMetaMask);
