/* Dropdown with search bar */

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
    deviceSearchWrapper.classList.add("active") // show autocomplete box
    showDevicesSuggestions()
    document.onclick = (e) => 
    {
        if( e.target.id == "device") null
        else if (e.target.id == "search-input-devices") null
        else 
        {
            deviceSearchWrapper.classList.remove("active")
            // Remove onclick event from document
            document.onclick = null
        }
    } 
}

//  Updates ingredients suggestion and excludes anything already present in the chips.
const updateDeviceSuggestions = () => devicesArray = userDevicesData 
? 
    devicesGroup.filter(device => !currentlySelectedDevices.includes(`${device.charAt(0).toUpperCase()}${device.slice(1)}`)).filter((data) => data.startsWith(userDevicesData))
: 
    devicesGroup.filter(device => !currentlySelectedDevices.includes(`${device.charAt(0).toUpperCase()}${device.slice(1)}`)) 

// Displays the list of suggestions LI elements.
function showDevicesSuggestions()
{
    updateDeviceSuggestions()
    userDevicesData 
    ?
        deviceSuggBox.innerHTML = !devicesArray.length 
        ? 
            '<li>' + deviceInputBox.value + '</li>' 
        : 
            devicesArray.map(data =>
            `
                <li id="device" class="col-4" onclick="launchDeviceChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
            `
            ).join('')
    :
    deviceSuggBox.innerHTML = devicesArray.map(data =>
    `
        <li id="device" class="col-4" onclick="launchDeviceChip('${data.charAt(0).toUpperCase()}${data.slice(1)}')">${data.charAt(0).toUpperCase()}${data.slice(1)}</li>
    `
    ).join('')
}

// Renders the chip section by looping over the list of currentlySelectedDevices.
const renderDevicesChips = () =>
{
    document.getElementById("selectedDevices").innerHTML = 
    currentlySelectedDevices.map(device => 
    `
    <div class="chip devices-chip d-flex align-items-center mx-1 mb-2">
        <p class="mb-0 mr-3" id="device-item">${device}</p>
        <i class="far fa-times-circle fa-lg close-button" onclick="closeDeviceChip('${device}')"></i>
    </div>
    `).join("")
}


function deviceFiltering()
{
    let filteredResult = filteredRecipes

    currentlySelectedDevices.forEach(device => 
    {
        filteredResult = filteredResult.filter((recipe) => 
        (
            recipe.appliance.toLowerCase() === device.toLowerCase()
        ))
    })
    return filteredResult
}

// Adds an ingredient to the list of currentlySelectedDevices.
const launchDeviceChip = (elem) =>
{
    currentlySelectedDevices.push(elem)
    renderDevicesChips()
    showDevicesSuggestions()
    currentlySelectedDevices.length >= 1 ? displayRecipes(deviceFiltering()) : displayRecipes(filteredRecipes)
    console.log(currentlySelectedDevices);
}

// Removes an ingredient from the list of currentlySelectedDevices.
const closeDeviceChip = (element) =>
{
    currentlySelectedDevices = currentlySelectedDevices.filter(elem => elem != element)
    renderDevicesChips()
    deviceFiltering()
    currentlySelectedDevices.length >= 1 ? displayRecipes(deviceFiltering()) : displayRecipes(filteredRecipes)
    showDevicesSuggestions()
    console.log(currentlySelectedDevices);
}

