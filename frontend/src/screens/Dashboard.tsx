import AnalyticsList from "../components/analytics/Analytics"
import Hero from "../components/dashboard/Hero"
import SideCalendar from "../components/dashboard/SideCalendar"
import Leaders from "../components/members/Leaders"

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <div className="p-2 border-r-2 border-gray-300 h-vh" style={{width:'75%'}}>
        <Hero />
        <AnalyticsList/>
        <Leaders/>
      </div>
      <div className="right flex justify-center" style={{width:'25%'}}>
        <SideCalendar/>
      </div>
    </div>
  )
}

export default Dashboard