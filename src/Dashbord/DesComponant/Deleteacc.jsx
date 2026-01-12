import React from 'react'

const Deleteacc = () => {
  return (
    <div className='ml-15'>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Delete my account
        </h1>
   <div className="min-h-120 flex  justify-center bg-blue-100/80 rounded-2xl px-4 py-6">
      <div className=" max-w-2xl  p-4 sm:p-10">
        <p className="text-gray-700 mb-6 leading-relaxed">
          (Name...), we`re sorry to see you go.
          <br />
          Please note that deleting your account is irreversible and all the
          data associated with your{" "}
          <span className="font-semibold">example@gmail.com</span> account
          (including access to training) will be permanently deleted.
        </p>


        {/* Feedback box */}
        <form
          className=" border rounded-xl p-4 sm:p-8 flex flex-col gap-5"
        >
          <label
            htmlFor="reason"
            className="text-gray-700 font-medium text-sm sm:text-base"
          >
            Before you leave, please tell us why you`d like to delete your
            account. This information will help us improve.
          </label>

          <textarea
            id="reason"
            placeholder="Why you want to delete your account."
            className="w-full h-42 border border-gray-400 rounded-md p-3
                       text-gray-800 text-sm sm:text-base resize-none
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="self-center sm:w-45 cursor-pointer bg-blue-500 text-white font-semibold
                       px-6 py-2 rounded-md hover:bg-blue-600
                       focus:outline-none focus:ring-2 focus:ring-blue-400
                       transition-colors"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>    </div>
  )
}

export default Deleteacc
