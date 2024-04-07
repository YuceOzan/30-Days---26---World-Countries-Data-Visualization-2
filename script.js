import { countries } from './country.js';

document.addEventListener('DOMContentLoaded', function () {
    const countriesDiv = document.getElementById('countries');
    const searchInput = document.getElementById('searchInput');
    const startingWordBtn = document.getElementById('startingWordBtn');
    const searchWithAnyWordBtn = document.getElementById('searchWithAnyWordBtn');
    const totalCountries = document.getElementById('totalCountries');
    const startingWordCount = document.getElementById('startingWordCount');
    const searchWithAnyWordCount = document.getElementById('searchWithAnyWordCount');

    // Display total number of countries
    totalCountries.textContent = countries.length;

    // Display all countries initially
    displayCountries(countries);

    let filterType = ''; // Variable to store active filter type

    // Event listener for starting word filter button
    startingWordBtn.addEventListener('click', function () {
        filterType = 'startingWord';
        startingWordBtn.classList.toggle('active');
        searchWithAnyWordBtn.classList.remove('active');
        filterCountries();
    });

    // Event listener for search with any word filter button
    searchWithAnyWordBtn.addEventListener('click', function () {
        filterType = 'searchWithAnyWord';
        searchWithAnyWordBtn.classList.toggle('active');
        startingWordBtn.classList.remove('active');
        filterCountries();
    });

    // Event listener for search input
    searchInput.addEventListener('input', filterCountries);

    // Function to filter countries based on active filter and search input
    function filterCountries() {
        let filteredCountries;
        const keyword = searchInput.value.trim().toLowerCase();

        if (filterType === 'startingWord') {
            const startingLetter = keyword.charAt(0);

            if (startingLetter.match(/[a-z]/i)) {
                filteredCountries = countries.filter(country => country.toLowerCase().startsWith(startingLetter));
                startingWordCount.textContent = `Number of countries starting with '${startingLetter.toUpperCase()}': ${filteredCountries.length}`;
            } else {
                filteredCountries = countries;
                startingWordCount.textContent = '';
            }

            searchWithAnyWordCount.textContent = '';
        } else if (filterType === 'searchWithAnyWord') {
            if (keyword.length > 0) {
                filteredCountries = countries.filter(country => country.toLowerCase().includes(keyword));
                searchWithAnyWordCount.textContent = `Number of countries containing '${keyword}': ${filteredCountries.length}`;
            } else {
                filteredCountries = countries;
                searchWithAnyWordCount.textContent = '';
            }

            startingWordCount.textContent = '';
        } else {
            filteredCountries = countries;
            startingWordCount.textContent = '';
            searchWithAnyWordCount.textContent = '';
        }

        displayCountries(filteredCountries);
    }

    // Function to display countries
    function displayCountries(countryList) {
        countriesDiv.innerHTML = '';
        let rowDiv;

        countryList.forEach((country, index) => {
            if (index % 6 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                countriesDiv.appendChild(rowDiv);
            }

            const countryDiv = document.createElement('div');
            countryDiv.textContent = country;
            countryDiv.classList.add('country');
            rowDiv.appendChild(countryDiv);
        });
    }
});
