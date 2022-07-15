const fileInputHidden = document.getElementById('fileInputHidden'),
    chooseImage = document.getElementById('chooseImage'),
    previewImage = document.getElementById('previewImage'),
    filter = document.querySelectorAll('.filter button'),
    filterSlider = document.querySelector('.sliderWrapper input'),
    filterValue = document.querySelector('.labelwithValue .right'),
    rotateFlipOptions = document.querySelectorAll('.rotateFlip button')


// let disableEditor = true

let brightness = 100, rotate = 0;

const loadImage = () => {
    // fileInputHidden.click();
    let file = fileInputHidden.files[0]
    console.log(file);
    if (!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        // disableEditor = false;
        document.querySelector('.container').classList.remove('disabled')
    })
}

const applyFilter = () => {
    previewImage.style.transform = `rotate(${rotate}deg)`;
    previewImage.style.filter = `brightness(${brightness}%)`;
}

filter.forEach(action => {
    action.addEventListener('click', function () {

        document.querySelector('.active').classList.remove('active');
        action.classList.add('active')
        if (action.id === "brightness") {
            filterSlider.max = "200"
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`
        }
    })
})

const updateFilter = () => {

    filterValue.innerText = `${filterSlider.value} %`
    const selectedFilter = document.querySelector('.filter .active');
    if (selectedFilter.id === 'brightness') {
        brightness = filterSlider.value;
    }
    applyFilter();

}

rotateFlipOptions.forEach(eachItem => {
    eachItem.addEventListener('click', function () {
        if (eachItem.id === "rotateLeft") {
            rotate -= 90;
        }
        applyFilter();

    })
})


filterSlider.addEventListener('input', updateFilter)
fileInputHidden.addEventListener('change', loadImage)
chooseImage.addEventListener('click', function () {
    fileInputHidden.click()
});