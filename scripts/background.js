var accordion = document.getElementById("accordion");

accordion.addEventListener("click", function () {
  this.classList.toggle("active");

  var panel = this.nextElementSibling;
  if (panel.style.display == "flex") {
    panel.style.display = "none";
  } else {
    panel.style.display = "flex";
  }
});

// ==========================================
// Adding to chrome storage
// =========================================
const nameInput = document.getElementById("name");
const valueInput = document.getElementById("value");
const addButton = document.getElementById("submit-button");

addButton.addEventListener("click", function () {
  // Reset border colors
  nameInput.style.borderColor = "";
  valueInput.style.borderColor = "";

  const name = nameInput.value.trim();
  const value = valueInput.value.trim();

  if (!name) {
    nameInput.style.borderColor = "red";
    return;
  }
  if (!value) {
    valueInput.style.borderColor = "red";
    return;
  }

  // Create an object with the key-value pair
  const data = {};
  data[name] = value;
  console.log(data);

  chrome.storage.local.set(data, function () {
    if (chrome.runtime.lastError) {
      console.error("Error saving data:", chrome.runtime.lastError);
    } else {
      console.log("Data saved successfully");
      console.log("saved successfully");
      // Clear input fields after successful save
      nameInput.value = "";
      valueInput.value = "";
      displayItem();
    }
  });
});

// ===========================================
//  Display and deletion of storage
// ===========================================
const bodyContent = document.getElementById("bodyContent");

function displayItem() {
  bodyContent.innerHTML = "";
  chrome.storage.local.get(null, (items) => {
    Object.keys(items).forEach((key) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <span>${key}</span>
          <div class='listContent'>
              <span class='item-key'>${items[key]}</span>
              <span class='button-end'>
              <button class='copy-btn'>copy</button>        
              <button class='delete-btn'>delete</button>        
              </span>
          </div>
        `;
      const deletebtn = listItem.querySelector(".delete-btn");
      const copybtn = listItem.querySelector(".copy-btn");

      deletebtn.addEventListener("click", () => deleteItem(key));
      copybtn.addEventListener("click", () => copyItemToClipboard(items[key]));
      bodyContent.appendChild(listItem);
    });
  });
}

function deleteItem(key) {
  chrome.storage.local.remove(key, () => {
    displayItem();
  });
}

function copyItemToClipboard(value) {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      alert("Copied the text: " + value);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

displayItem();
