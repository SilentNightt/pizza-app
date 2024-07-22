import React, { useState } from 'react'

function Categories() {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]
  const [activeCategories, setActiveCategories] = useState(3);
  return (
    <div className="categories">
    <ul>
      {
        categories.map( (value, index) => (<li key={index} onClick = {() => {setActiveCategories(index)}} className={activeCategories === index ? 'active' : ''}>{value}</li>) )
      }
    </ul>
  </div>
  )
}

export default Categories