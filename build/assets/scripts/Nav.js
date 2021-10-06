const Nav = ({ isLoggedIn = false, activePage = 'home' } = {}) => {
  return `
    <nav class="Nav">
      <ul class="flex items-center flex-wrap bg-white p-6">
        <li class="mr-6">
          <a class="text-blue-500 hover:text-blue-800" href="/home">Home</a>
        </li>
        <li class="mr-6">
          <a class="text-blue-500 hover:text-blue-800" href="/login">Login</a>
        </li>
        <li class="mr-6">
          <a class="text-blue-500 hover:text-blue-800" href="/signup">Sign Up</a>
        </li>
        <li class="mr-6">
          <a class="text-blue-500 hover:text-blue-800" href="/">Dashboard</a>
        </li>
      </ul>
    </nav>
  `
};

document.querySelector('#navbar').innerHTML = `${Nav()}`;