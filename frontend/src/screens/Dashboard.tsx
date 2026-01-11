import AnalyticsList from "../components/analytics/Analytics"
import Hero from "../components/dashboard/Hero"
import SideCalendar from "../components/dashboard/SideCalendar"
import Leaders from "../components/members/Leaders"

const Dashboard: React.FC = () => {
  return (
    /* min-[1330px]:grid-cols-4 -> Side-by-side only above 1330px
       grid-cols-1 -> Stacks vertically by default (below 1330px)
    */
    <div className="grid grid-cols-1 min-[1330px]:grid-cols-4 min-h-screen">

      {/* MAIN CONTENT 
          min-[1330px]:col-span-3 -> Takes 75% width above 1330px
          col-span-1 -> Takes 100% width below 1330px
      */}
      <main className="col-span-1 min-[1330px]:col-span-3 p-3 md:p-5 space-y-6 min-[1330px]:border-r border-gray-200">
        <Hero />

        <section>
          <AnalyticsList />
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-50 p-2">
          <Leaders />
        </section>
      </main>

      {/* SIDEBAR (Calendar)
          Below 1330px: This automatically moves below the <main> section
      */}
      <aside className="col-span-1 p-4 bg-slate-50/50 flex flex-col items-center">
        <div className="sticky w-full flex flex-col items-center min-[1330px]:items-start">
          <h2 className="text-blue-950 font-bold mb-4 px-2 uppercase text-xs tracking-widest text-center min-[1330px]:text-left w-full">
            Upcoming Events
          </h2>
          <SideCalendar />
        </div>
      </aside>

    </div>
  )
}

export default Dashboard