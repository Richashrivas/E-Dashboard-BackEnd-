import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [msg, setMsg] = useState('')

  const handleSubmit = async () => {
    console.log(email, password);

    try{
        const res = await fetch('http://localhost:5000/login', {
            method:'POST',
            body: JSON.stringify({email, password}),
            headers:{
                'content-Type' : 'application/json'
            }
        });
        const data = await res.json()
        console.log(data);
        if(data.auth){
            localStorage.setItem('user', JSON.stringify(data.data));
            localStorage.setItem('token', JSON.stringify(data.data));

            navigate('/');
        }else{
            alert('please enter the correct details.');
        }
        
    }catch(err){
        console.log('Network Error...')
        setMsg('Network Error...')
    }
  };
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/')
    }

  }, []);

  return (
    <div>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign In
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="signup"
                  title=""
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
              <form action="#" method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      onClick={handleSubmit}
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
      {msg}
    </div>
  );
};
