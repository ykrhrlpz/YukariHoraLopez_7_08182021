// Global variables
let currentlySelectedDevices = []
let devicesArray = []
let userDevicesData

//getting all required elements
const deviceSearchWrapper = document.getElementById("devices-search-input")
const deviceInputBox = deviceSearchWrapper.querySelector("input")
const deviceSuggBox = deviceSearchWrapper.querySelector(".autocom-box")

//if user press any key and release
deviceInputBox.onkeyup = (e) =>
{
    userDevicesData = e.target.value.toLowerCase() // user entered data, we turn it to lower case

    if (userDevicesData)
    {
        deviceSearchWrapper.classList.add("active") // show autocomplete box
    }
    else
    {
        deviceSearchWrapper.classList.remove("active") // hide autocomplete box
        document.getElementById("search-input-devices").placeholder = "Search an device";
    }
    showDevicesSuggestions()
}


deviceInputBox.onfocus = (e) =>
{
    ingredientSearchWrapper.classList.remove("active")
    utensilSearchWrapper.classList.remove("active")

    ingredientInputBox.setAttribute("placeholder", "Ingredients")
    utensilInputBox.setAttribute("placeholder", "Utensils")
    ingredientInputBox.value = ""
    utensilInputBox.value = ""

    deviceSearchWrapper.classList.add("active") // show autocomplete box
    deviceInputBox.style.borderRadius="5px 5px 0 0"
    deviceInputBox.style.boxShadow="none"
    deviceInputBox.setAttribute("placeholder", "search a device")
    showDevicesSuggestions()
    document.onclick = (e) => 
    {
        if( e.target.id == "device") null
        else if (e.target.id == "search-input-devices") null
        else 
        {
            deviceSearchWrapper.classList.remove("active")
            deviceInputBox.style.borderRadius="5px"
            deviceInputBox.setAttribute("placeholder", "Devices")
            deviceInputBox.value = ""
            userDevicesData = null
            showDevicesSuggestions()
       
            // Remove onclick event from document
            document.onclick = null
        }
    } 
}

//  Updates devices suggestion and excludes anything already present in the chips.
const updateDeviceSuggestions = () => 
{
    if(userDevicesData)
        devicesArray = devicesGroup.filter(device => !currentlySelectedDevices.includes(`${device.charAt(0).toUpperCase()}${device.slice(1)}`)).filter((data) => data.startsWith(userDevicesData))
    else 
        devicesArray = devicesGroup.filter(device => !currentlySelectedDevices.includes(`${device.charAt(0).toUpperCase()}${device.slice(1)}`)) 
}

// Displays the list of suggestions LI elements.
function showDevicesSuggestions()
{
    updateDeviceSuggestions()
    if(userDevicesData)
        if(!devicesArray.length)
            deviceSuggBox.innerHTML = '<li>' + deviceInputBox.value + '</li>'
        else
            deviceSuggBox.innerHTML = devicesArray.map(data =>
            `
                <li id="device" class="col-xs-12 col-md-4" onclick="launchDeviceChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
            `
            ).join('')
    else
        deviceSuggBox.innerHTML = devicesArray.map(data =>
        `
            <li id="device" class="col-xs-12 col-md-4" onclick="launchDeviceChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
        `
        ).join('')
}

// Renders the chip section by looping over the list of currentlySelectedDevices.
const renderDevicesChips = () =>
{
    document.getElementById("selectedDevices").innerHTML = 
    currentlySelectedDevices.map(device => 
    `
    <div class="chip devices-chip d-flex align-items-center mx-1 my-2">
        <p class="mb-0 mr-3" id="device-item">${device}</p>
        <i class="far fa-times-circle fa-lg close-button" onclick="closeDeviceChip('${device}')"></i>
    </div>
    `).join("")
}

function deviceFiltering()
{
    currentlySelectedDevices.forEach(device => 
    {
        filteredRecipes = filteredRecipes.filter((recipe) => 
        (
            recipe.appliance.toLowerCase() === device.toLowerCase()
        ))
    })
}

// Adds an device to the list of currentlySelectedDevices.
const launchDeviceChip = (elem) =>
{
    currentlySelectedDevices.push(elem)
    renderDevicesChips()
    userDevicesData = null
    showDevicesSuggestions()
    deviceInputBox.value = ""
    updateFilters(searchString)
}

// Removes an device from the list of currentlySelectedDevices.
const closeDeviceChip = (element) =>
{
    currentlySelectedDevices = currentlySelectedDevices.filter(elem => elem != element)
    renderDevicesChips()
    deviceFiltering()
    showDevicesSuggestions()
    updateFilters(searchString)
}

