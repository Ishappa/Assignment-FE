// Function to change tab
function changeTab(tab) {
    currentTab = tab;
    currentPage = 1; // Reset current page when changing tab
    displayCardList(currentTab, currentSearch, currentTypeFilter);
  }
  
  // Function to search cards
  function searchCards() {
    currentSearch = document.getElementById('search-input').value.trim();
    currentPage = 1; // Reset current page when searching
    displayCardList(currentTab, currentSearch, currentTypeFilter);
  }
  
  // Function to filter cards by type
  function filterByType() {
    currentTypeFilter = document.getElementById('type-filter').value;
    currentPage = 1; // Reset current page when filtering
    displayCardList(currentTab, currentSearch, currentTypeFilter);
  }
  
  // Function to display the card list
  function displayCardList(tab, search, typeFilter) {
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = ''; // Clear existing card list
  
    const filteredData = mockApiResponse.data.filter(card => {
      // Filter by tab
      if (tab === 'your' && card.owner_id !== 1) {
        return false;
      }
      if (tab === 'blocked' && card.status !== 'blocked') {
        return false;
      }
  
      // Filter by search query
      if (search && !card.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
  
      // Filter by card type
      if (typeFilter && card.card_type !== typeFilter) {
        return false;
      }
  
      return true;
    });
  
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);
  
    displayedData.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
  
      const typeElement = document.createElement('div');
      typeElement.className = 'type';
      typeElement.innerText = card.card_type === 'burner' ? 'Burner' : 'Subscription';
      cardElement.appendChild(typeElement);
  
      const nameElement = document.createElement('h2');
      nameElement.innerText = card.name;
      cardElement.appendChild(nameElement);
  
      const budgetElement = document.createElement('p');
      budgetElement.innerText = `Budget: ${card.budget_name}`;
      cardElement.appendChild(budgetElement);
  
      const spentElement = document.createElement('p');
      spentElement.innerText = `Spent: ${card.spent.value} ${card.spent.currency}`;
      cardElement.appendChild(spentElement);
  
      const availableElement = document.createElement('p');
      availableElement.innerText = `Available to Spend: ${card.available_to_spend.value} ${card.available_to_spend.currency}`;
      cardElement.appendChild(availableElement);
  
      if (card.card_type === 'burner') {
        const expiryElement = document.createElement('div');
        expiryElement.className = 'expiry';
        expiryElement.innerText = `Expiry: ${card.expiry}`;
        cardElement.appendChild(expiryElement);
      } else if (card.card_type === 'subscription') {
        const limitElement = document.createElement('div');
        limitElement.className = 'limit';
        limitElement.innerText = `Limit: ${card.limit}`;
        cardElement.appendChild(limitElement);
      }
  
      const statusElement = document.createElement('div');
      statusElement.className = 'status';
      statusElement.innerText = `Status: ${card.status}`;
      cardElement.appendChild(statusElement);
  
      cardList.appendChild(cardElement);
    });
  }
  