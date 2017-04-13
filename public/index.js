const name = $('#name')
const reason = $('#reason')
const cleanliness = $('#clean')


$(document).ready(()=>{
  addItems()
  countItems()
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
			<li id=${item.id} class='items-card'>Item: ${item.name}<br/> Reason: ${item.reason}<br/> Cleanliness: ${item.cleanliness}</li>
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

$('.garage-door').on('click',(e)=>{
  $('.garage').toggle()
})
$('.sort').on('click',(e)=>{
  sortByName()
})

// $('.submit').on('click',(e)=>{
//   e.preventDefault()
//   let cleanstuff = $('#clean').find(":selected").val()
//   console.log(cleanstuff);
// })
