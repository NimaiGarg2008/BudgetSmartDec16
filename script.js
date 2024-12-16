aValue = parseInt(localStorage.getItem("myValue"));

function goToNextPage(nextPage)
{
    localStorage.setItem("myValue", aValue);
    window.location.href = nextPage;
    location.replace(nextPage);
}
