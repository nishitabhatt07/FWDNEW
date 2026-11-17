document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortBy = document.getElementById('sortBy');
    const cardsContainer = document.querySelector('.cards');
    const cards = Array.from(document.querySelectorAll('.placement-card'));
    const modal = document.getElementById('applyModal');
    const confirmApply = document.getElementById('confirmApply');
    let applicationUrl = '';

    const filterAndSortCards = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const location = locationFilter.value;
        const type = typeFilter.value;

        cards.forEach((card) => {
            const matchesSearch = card.dataset.company.toLowerCase().includes(searchTerm);
            const matchesLocation = location === 'all' || card.dataset.location === location;
            const matchesType = type === 'all' || card.dataset.type === type;
            card.hidden = !(matchesSearch && matchesLocation && matchesType);
        });

        if (sortBy.value === 'deadline') {
            cards.sort((first, second) =>
                first.dataset.deadline.localeCompare(second.dataset.deadline)
            );
            cards.forEach((card) => cardsContainer.appendChild(card));
        }
    };

    [searchInput, locationFilter, typeFilter, sortBy].forEach((control) => {
        control.addEventListener('input', filterAndSortCards);
        control.addEventListener('change', filterAndSortCards);
    });

    window.openModal = (url) => {
        applicationUrl = url;
        modal.style.display = 'flex';
    };

    window.closeModal = () => {
        modal.style.display = 'none';
        applicationUrl = '';
    };

    confirmApply.addEventListener('click', () => {
        if (applicationUrl) {
            window.open(applicationUrl, '_blank', 'noopener,noreferrer');
        }
        window.closeModal();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            window.closeModal();
        }
    });

    filterAndSortCards();
});
