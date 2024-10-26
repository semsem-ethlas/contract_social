function alertLocalStorage() {
    // Update localStorage with the third key
    localStorage.setItem('avatar-src-sammam.eth', 'https://files.gitter.im/5e04f15ed73408ce4fd516af/GPDH/1111111.png');

    // Collect and alert all local storage data
    let localStorageData = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageData += `${key}: ${value}\n`;
    }
    alert('Local Storage:\n' + localStorageData);
}
