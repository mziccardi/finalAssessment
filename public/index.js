const name = $('#name')
const reason = $('#reason')
const cleanliness = $('#clean')


$(document).ready(()=>{
  addItems()
  countItems()
  toggleDoor()
})


$('.submit').on('click',(e)=>{
  e.preventDefault()
  const newItem = {
    name:name.val(),
    reason:reason.val(),
    cleanliness:cleanliness.find(":selected").val()
  }
  createItem(newItem)
  countItems()
})



const createItem = (newItem)=>{
  axios.post('/api/items', newItem)
  .then((response)=>{
    appendHelper(response.data)
  })
  clearInputs()
}

const addItems = ()=>{
  axios.get('/api/items')
  .then((response)=>{
    appendHelper(response.data)
  })
}

 const appendHelper = (items)=>{
   $('.item-list').empty();
	items.map((item) => {
		$('.item-list').append(`
			<li id=${item.id} class='items-card'>Item: ${item.name}
			`);
 })
}

const clearInputs = ()=>{
  $('.name-input').val('')
  $('.reason-input').val('')
}

const countItems = ()=>{
  axios.get('/api/items')
  .then((response)=>{
    $('.item-count').html(`Total number of items: ${response.data.length}`)
  })
  countSparklingItems()
  countDustyItems()
  countRancidItems()
}

$('.item-list').on('click', 'li',  (e)=>{
  let id = e.target.id
  axios.get(`/api/items/${id}`)
  .then((response)=>{
    console.log(response);
    let singleResponse = response.data
    detailedItems(singleResponse)

  })
})

const detailedItems = (singleResponse)=>{
  $('.single-item').html('')
  $('.single-item').append(renderSingle(singleResponse))
}


//update cleanliness
$('.single-item').on('click', 'button', (e)=>{
  // console.log('clikc');
  let id = e.target.id
  console.log(id);
  axios.patch(`/api/items/${id}`,{
    cleanliness:$('#newClean').find(":selected").val()
  })
  .then((response)=>{
    console.log(response)
  })
})

const renderSingle = (singleResponse)=>{
  return (`<h5> ${singleResponse[0].name}</h5>
    <h5>${singleResponse[0].reason}</h5>
    <h5>${singleResponse[0].cleanliness}</h5>
    <label> Cleanliness
      <select id='newClean' name='cleanliness'>
        <option value='sparkling'>sparkling</option>
        <option value='dusty'>dusty</option>
        <option value='rancid'>rancid</option>
      </select>
      <button id=${singleResponse[0].id}>Update Cleanliness</button>`)
}

const countSparklingItems = ()=>{
  axios.get('/api/items')
  .then((response)=>{
    let allItems= response.data
    let counter = countSparkleHelper(allItems)
    $('.sparkle-count').html(`Number of sparkling items: ${counter}`)
  })
}
const countDustyItems = ()=>{
  axios.get('/api/items')
  .then((response)=>{
    let allItems= response.data
    let counter = countDustyHelper(allItems)
    $('.dusty-count').html(`Number of dusty items: ${counter}`)
  })
}
const countRancidItems = ()=>{
  axios.get('/api/items')
  .then((response)=>{
    let allItems= response.data
    let counter = countRancidHelper(allItems)
    $('.rancid-count').html(`Number of rancid items: ${counter}`)
  })
}

const sortByName = ()=>{
  axios.get('/api/items')
  .then((response)=>{
    let allItems = response.data
    let sorted =  sortHelper(allItems)
    console.log(allItems);
    appendHelper(sorted)
  })
}

const sortHelper = (allItems)=>{
  let sorted = allItems.sort((a,b)=>{
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()
    if(nameA < nameB) return -1
    if(nameA > nameB) return 1
    return 0
  })
  return sorted
}

const countSparkleHelper = (allItems)=>{
  let count = 0
  for(let i=0; i<allItems.length; i++){
    if(allItems[i].cleanliness === 'sparkling'){
      count++
    }
  }
  return count
}
const countDustyHelper = (allItems)=>{
  let count = 0
  for(let i=0; i<allItems.length; i++){
    if(allItems[i].cleanliness === 'dusty'){
      count++
    }
  }
  return count
}
const countRancidHelper = (allItems)=>{
  let count = 0
  for(let i=0; i<allItems.length; i++){
    if(allItems[i].cleanliness === 'rancid'){
      count++
    }
  }
  return count
}

const toggleDoor = ()=>{
  $('.garage').toggle()
}
$('.garage-door').on('click',(e)=>{
  $('.garage').toggle()
})

// $('.submit').on('click',(e)=>{
//   e.preventDefault()
//   let cleanstuff = $('#clean').find(":selected").val()
//   console.log(cleanstuff);
// })
