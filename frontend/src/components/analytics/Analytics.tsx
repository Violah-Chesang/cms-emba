// src/components/Analytics.tsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, fetchMembersByFellowship } from "../../store/slices/memberSlice";
import { RootState } from "../../store/store";
import { makeSelectFellowshipMembers, selectAllMembers, selectLoading, selectError } from "../../store/selectors/memberSelector";
import lineChart from "../../assets/line-chart-removebg-preview.png";

const fellowshipGroups = [
    { group: "men-fellowship", label: "Men" },
    { group: "women-fellowship", label: "Women" },
    { group: "youth-fellowship", label: "Youth" },
    { group: "jss", label: "JSS" },
    { group: "all", label: "All" },
];

interface AnalyticsCardProps {
    group: string;
    number: number;
    percentage: number;
}

function AnalyticsCard({ group, number, percentage }: AnalyticsCardProps) {
    return (
        <div className="bg-blue-100 p-3 rounded-lg m-1 flex-1 w-full md:w-1/2 lg:w-1/3">
            <div className="flex flex-row items-center justify-between">
                <div className="w-full">
                    <p className="font-bold text-md">{group} Fellowship(s)</p>
                    <p className="text-3xl py-3 font-semibold">{number}</p>
                </div>
                <div>
                    <img src={lineChart} alt="Line Chart" width={80} height={80} />
                </div>
            </div>
            <div className="flex flex-row justify-between gap-2">
                <p className="w-full text-sm">Percentage</p>
                <p className="font-semibold text-lg">{percentage}%</p>
            </div>
        </div>
    );
}

interface FellowshipAnalyticsProps {
    group: { group: string; label: string };
    totalMembers: number;
}

const FellowshipAnalytics = ({ group, totalMembers }: FellowshipAnalyticsProps) => {
    const dispatch = useDispatch();
    const selectFellowshipMembers = useMemo(makeSelectFellowshipMembers, []);
    const members = useSelector((state: RootState) =>
        group.label === "All" ? selectAllMembers(state) : selectFellowshipMembers(state, group.label)
    );
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        if (group.label === "All") {
            if (members.length === 0) {
                dispatch(fetchMembers() as any);
            }
        } else {
            if (members.length === 0) {
                dispatch(fetchMembersByFellowship(group.label) as any);
            }
        }
    }, [dispatch, group.label, members.length]);

    if (loading) return <p>Loading...</p>;
    if (error && typeof error === 'string') return <p>Error: {error}</p>;

    const number = members.length;
    const percentage = (number / totalMembers) * 100;

    return <AnalyticsCard group={group.label} number={number} percentage={Number(percentage.toFixed(1))} />;
};

const AnalyticsList = () => {
    const dispatch = useDispatch();
    const totalMembersData = useSelector(selectAllMembers);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        if (totalMembersData.length === 0) {
            dispatch(fetchMembers() as any);
        }
    }, [dispatch, totalMembersData.length]);

    const totalMembers = totalMembersData.length;

    if (loading) return <p>Loading...</p>;
    if (error && typeof error === 'string') return <p>Error: {error}</p>;

    return (
        <div>
            <p className="text-blue-950 text-xl font-bold pt-2">Member Statistics</p>
            <div className="flex flex-row flex-wrap">
                {fellowshipGroups.map((group) => (
                    <FellowshipAnalytics key={group.group} group={group} totalMembers={totalMembers} />
                ))}
            </div>
        </div>
    );
};

export default AnalyticsList;
