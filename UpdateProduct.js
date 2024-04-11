import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct()
{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const params = useParams();
    const navigate = useNavigate();

   const getProductDetails=async()=>{
    // console.log('value of params : ',params)
    let result = await fetch(`http://localhost:5000/products/${params.id}`)
    const data = await result.json()
    console.log(data);
    setName(data.name);
    setCategory(data.category);
    setCompany(data.company);
    setDescription(data.description);
    setPrice(data.price)
   }

    const handleUpdates=async()=>{
      console.log(name, description, category, price, company);

      let result = await fetch(`http://localhost:5000/products/${params.id}`,{
        method:'PUT',
        body:JSON.stringify({name, description, company, category, price}),
        headers:{
          'Content-Type':'application/json'
        }
      });
      const data = await result.json()
      console.log(data)
      if(data){
        navigate('/')
      }
      
    };

    useEffect(()=>{
      getProductDetails();
    },[]);

    return( 
        <div>
        <section>
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Update Product Here!
              </h2>
              <form action="#" method="POST" className="mt-8" enctype="multipart/form-data">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Product Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter Product Name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* { msg && !name && <span style={{color:'red'}}>Enter valid name</span>} */}

                  <div>
                    <label
                      htmlFor="description"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Product Description{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter Product description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="price"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Price{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter Price"
                        id="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label
                      htmlFor="Category"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Category Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label
                      htmlFor="Company"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Brand Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter Brand"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      onClick={handleUpdates}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}