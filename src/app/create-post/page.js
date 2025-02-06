import Form from "@/components/Create-Post/Form";

const CreatePost = () => {
  return (
    <div className="bg-white flex justify-center">
      <div
        className="p-6 my-8 bg-white rounded-lg
       shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] w-[95%] lg:w-[35%] md:w-[60%] max-w-[500px]"
      >
        <h2 className="text-[30px] text-center font-extrabold text-blue-500 mb-6">
          Create Post
        </h2>
        <Form />
      </div>
    </div>
  );
};

export default CreatePost;
