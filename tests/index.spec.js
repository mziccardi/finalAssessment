describe('Items',()=>{
  const items = [
    {
      id:1,
      name:'shoes',
      reason:'dont fit',
      cleanliness:'rancid'
    },
    {
      id:2,
      name:'golf club',
      reason:'too hot',
      cleanliness:'sparkling'
    },
    {
      id:2,
      name:'bike',
      reason:'flat tire',
      cleanliness:'dusty'
    },
  ]

  it('should sort names', ()=>{
    let thing = sortHelper(items)
    expect(thing[0].name).to.equal('bike')
    expect(thing[1].name).to.equal('golf club')
  })
})
