import { useForm } from 'react-hook-form';
interface SignUpData {
 name: string;
 email: string;
 password: string;
}
const SignUpForm:React.FC = () => {
 const { register, formState: { errors }, handleSubmit } = useForm();
const onSubmit = (data: SignUpData) => {
  console.log(data);
 };
return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="rounded-md shadow-sm">
      <label
       htmlFor="name"
       className="block text-sm font-medium leading-5 text-gray-700"
      >
       Name
      </label>
      <input
       id="name"
       className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
       type="text"
       {...register("name")}
      />
      {errors.password && (
       <div className="mt-2 text-xs text-red-600">
        {errors.password.message}
       </div>
      )}
     </div>
     <div className="mt-6">
      <label
       htmlFor="email"
       className="block text-sm font-medium leading-5 text-gray-700"
      >
       Email address
      </label>
      <div className="mt-1 rounded-md shadow-sm">
       <input
        id="email"
        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        type="email"
       {...register("email")}

       />
       {errors.email && (
        <div className="mt-2 text-xs text-red-600">
         {errors.email.message}
        </div>
       )}
      </div>
     </div>
     <div className="mt-6">
      <label
       htmlFor="password"
       className="block text-sm font-medium leading-5 text-gray-700"
      >
       Password
      </label>
      <div className="mt-1 rounded-md shadow-sm">
       <input
        id="password"
        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        type="password"
        name="password"
        ref={register({
         required: 'Please enter a password',
         minLength: {
          value: 6,
          message: 'Should have at least 6 characters',
         },
        })}
       />
       {errors.password && (
        <div className="mt-2 text-xs text-red-600">
         {errors.password.message}
        </div>
       )}
      </div>
     </div>
      <div className="mt-6">
      <span className="block w-full rounded-md shadow-sm">
       <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
       >
        Sign up
       </button>
      </span>
     </div>
    </form>
   );
  }
};

export default SignUpForm;