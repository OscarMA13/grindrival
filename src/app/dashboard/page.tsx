import Topbar from "@/components/topbar";

export default function Dashboard() {
  return (
    <div className='flex flex-col w-full h-full'>
      <Topbar />
      <div className='w-full'>
        <div className=" w-full items-center text-center ">This is the dashboard page.</div>
        <div className=" w-full items-center text-center ">This is the dashboard page.</div>
      </div>
    </div>
  );
}
