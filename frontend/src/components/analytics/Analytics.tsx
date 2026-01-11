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
    isLoading: boolean;
}

function AnalyticsCard({ group, number, percentage, isLoading }: AnalyticsCardProps) {
    if (isLoading) {
        return (
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col justify-between border border-blue-100 animate-pulse h-32">
                <div className="flex flex-row justify-between">
                    <div className="space-y-3 w-1/2">
                        <div className="h-3 bg-blue-200 rounded w-full"></div>
                        <div className="h-8 bg-blue-200 rounded w-3/4"></div>
                    </div>
                    <div className="w-16 h-16 bg-blue-200 rounded-full"></div>
                </div>
                <div className="h-4 bg-blue-200 rounded w-full mt-4"></div>
            </div>
        );
    }

    return (
        <div className="bg-blue-100 p-4 rounded-lg flex flex-col justify-between shadow-sm border border-blue-200 transition-all">
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex-1">
                    <p className="font-bold text-blue-950 text-sm md:text-sm capitalize tracking-tight">
                        {group} Fellowship(s)
                    </p>
                    {/* If number is 0, it shows 0 clearly */}
                    <p className={`text-2xl md:text-3xl py-2 font-bold ${number === 0 ? 'text-gray-400' : 'text-blue-900'}`}>
                        {number}
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <img
                        src={lineChart}
                        alt="Line Chart"
                        className={`w-16 h-16 md:w-20 md:h-20 object-contain ${number === 0 ? 'grayscale opacity-30' : 'opacity-80'}`}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-between items-center border-t border-blue-200 pt-2 mt-2">
                <p className="text-xs md:text-sm text-blue-800 font-medium">Percentage</p>
                <p className="font-bold text-lg text-blue-900">{percentage}%</p>
            </div>
        </div>
    );
}

interface FellowshipAnalyticsProps {
    group: { group: string; label: string };
    totalMembers: number;
    isInitialLoading: boolean; // Prop to track if the very first fetch is happening
}

const FellowshipAnalytics = ({ group, totalMembers, isInitialLoading }: FellowshipAnalyticsProps) => {
    const dispatch = useDispatch();
    const selectFellowshipMembers = useMemo(makeSelectFellowshipMembers, []);

    const members = useSelector((state: RootState) =>
        group.label === "All" ? selectAllMembers(state) : selectFellowshipMembers(state, group.label)
    );

    useEffect(() => {
        // Only fetch if we don't have members and we haven't already tried fetching
        // Note: You might need a 'hasFetched' flag in your Redux state for perfect accuracy
        if (members.length === 0) {
            if (group.label === "All") {
                dispatch(fetchMembers() as any);
            } else {
                dispatch(fetchMembersByFellowship(group.label) as any);
            }
        }
    }, [dispatch, group.label]);

    const number = members.length;
    const percentage = totalMembers > 0 ? (number / totalMembers) * 100 : 0;

    return (
        <AnalyticsCard
            group={group.label}
            number={number}
            percentage={Number(percentage.toFixed(1))}
            isLoading={isInitialLoading}
        />
    );
};

const AnalyticsList = () => {
    const dispatch = useDispatch();
    const totalMembersData = useSelector(selectAllMembers);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Track if we have data or if we are still waiting for the first response
    // If loading is false and totalMembersData is 0, it means there are actually NO members.
    const isInitialLoading = loading && totalMembersData.length === 0;

    useEffect(() => {
        dispatch(fetchMembers() as any);
    }, [dispatch]);

    if (error && typeof error === 'string') {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                Error loading statistics: {error}
            </div>
        );
    }

    const totalMembers = totalMembersData.length;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between pb-4">
                <p className="text-blue-950 text-xl font-bold">Member Statistics</p>
                {loading && <span className="text-xs text-blue-600 animate-pulse font-bold uppercase">Syncing...</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {fellowshipGroups.map((group) => (
                    <FellowshipAnalytics
                        key={group.group}
                        group={group}
                        totalMembers={totalMembers}
                        isInitialLoading={isInitialLoading}
                    />
                ))}
            </div>

            {/* Empty State Footer Message */}
            {!loading && totalMembers === 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-center">
                    <p className="text-yellow-700 text-sm font-medium">
                        No members found in the database. Start by adding members to see statistics.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AnalyticsList;