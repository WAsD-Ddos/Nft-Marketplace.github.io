// Sidebar burger section
function openSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove('sidebar--close');
  document.addEventListener('click', handleClickOutside);
}

function closeSidebar() {
  if (!sidebar) return;
  sidebar.classList.add('sidebar--close');
  document.removeEventListener('click', handleClickOutside);
}

function handleClickOutside(event) {
  if (!sidebar.contains(event.target) &&
    event.target !== headerBurgerBtn &&
    event.target !== sidebarBtn) {
    closeSidebar();
  }
}

// Event listeners
sidebarBtn.addEventListener('click', closeSidebar);

headerBurgerBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  if (sidebar.classList.contains('sidebar--close')) {
    openSidebar();
  } else {
    closeSidebar();
  }
});