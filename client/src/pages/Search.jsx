import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8'>
          <div className='flex items-center gap-2 '>
            <label className='whitespace-nowrap'>Search Term :</label>
            <input type='text'
            id="searchTerm"
            placeholder='search'
            className='border rounded-lg w-full p-3'
            />
          </div>
          <div className='flex gap-2 flex-wrap  items-center'>
            <label className='font-semibold'>Type</label>
            <div className='flex gap-2'>
             <input type='checkbox' id='all' className='w-5'/>
             <label>Rent & Sale</label>
            </div>
            <div className='flex gap-2'>
             <input type='checkbox' id='rent' className='w-5'/>
             <label>Rent</label>
            </div>
            <div className='flex gap-2'>
             <input type='checkbox' id='sale' className='w-5'/>
             <label>Sale</label>
            </div>
            <div className='flex gap-2'>
             <input type='checkbox' id='offer' className='w-5'/>
             <label>Offer</label>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap  items-center'>
          <label className='font-semibold'>Aminities</label>
          <div className='flex gap-2'>
           <input type='checkbox' id='parking' className='w-5'/>
           <label>Parking</label>
          </div>
          <div className='flex gap-2'>
           <input type='checkbox' id='furnished' className='w-5'/>
           <label>Furnished</label>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <label className='font-semibold'>Sort :</label>
          <select id="sort_order" className='border rounded-lg p-3'>
           <option>low to high</option> 
           <option>high to low</option> 
           <option>latest</option> 
           <option>oldest</option> 
          </select>
        </div>
        <button className='bg-slate-700  text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
        </form>
      </div>
      <div className='text-3xl font-semibold p-3 border-bottom text-slate-700 mt-5'>
        <h1>Listing Results : </h1>
      </div>
    </div>
  )
}
