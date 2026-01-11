import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembersByFellowship } from "../../store/slices/memberSlice";
import { RootState, AppDispatch } from "../../store/store";
import FellowshipComponent from "../../components/members/Fellowship";
import { makeSelectFellowshipMembers, selectLoading, selectError } from "../../store/selectors/memberSelector";
import { useRenderLogger } from "../../hooks/useRenderLogger";

interface Member {
    _id: string;
    memberId: string;
    firstName: string;
    middleName: string;
    surName: string;
    dob: string;
    phone: string;
    email: string;
    physicalAddress: string;
    nationalId: string;
    maritalStatus: string;
    marriageType: string;
    spouseName: string;
    gender: string;
    savedStatus: string;
    baptisedStatus: string;
    cellGroup: string;
    confirmationStatus: string;
    otherChurchMembership: string;
    marriageCeremonyType: string;
    memberType: string;
    ministry: string;
    fellowship: string;
    age: number;
    leadershipRole: string;
    deleted: boolean;
    isActive: string;
    regDate: string;
    color: string;
    notes: string;
    __v: number;
}

interface Column {
    header: string;
    accessor: keyof Member | 'name';
}

const columns: Column[] = [
    { header: "Member ID", accessor: "memberId" },
    { header: "Name", accessor: "name" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Baptised", accessor: "baptisedStatus" },
    { header: "Gender", accessor: "gender" },
    { header: "Ministry", accessor: "ministry" },
    { header: "Fellowship", accessor: "fellowship" },
    { header: "Status", accessor: "isActive" },
];

const Clergy: React.FC = () => {
    useRenderLogger('Clergy');

    const dispatch = useDispatch<AppDispatch>();
    const selectFellowshipMembers = useMemo(() => makeSelectFellowshipMembers(), []);

    const members = useSelector((state: RootState) => selectFellowshipMembers(state, "JSS"));
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const fetchMembers = useCallback(() => {
        dispatch(fetchMembersByFellowship("Clergy"));
    }, [dispatch]);

    React.useEffect(() => {
        if (members.length === 0 && !loading && !error) {
            fetchMembers();
        }
    }, [members.length, loading, error, fetchMembers]);

    const transformedMembers = useMemo(() => {
        if (!members || !Array.isArray(members)) return [];

        return members.map((member: Member) => {
            const avatarStyle = member.color
                ? { backgroundColor: member.color }
                : { backgroundColor: 'transparent', border: '2px solid black' };

            return {
                ...member,
                name: (
                    <div className="flex items-center">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4"
                            style={avatarStyle}
                        >
                            {member.firstName.charAt(0)}
                            {member.middleName ? member.middleName.charAt(0) : member.surName.charAt(0)}
                        </div>
                        <span className="font-medium text-blue-950">
                            {`${member.firstName} ${member.middleName ? member.middleName + ' ' : ''}${member.surName}`}
                        </span>
                    </div>
                )
            };
        });
    }, [members]);

    if (loading) return <div className="p-10 text-center text-blue-950 font-bold">Loading Clergy Records...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold italic border border-red-200 bg-red-50 rounded">Error: {error}</div>;

    return (
        <div className="p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-blue-950 uppercase tracking-tight">Church Clergy</h1>
                <p className="text-gray-500 text-sm italic">Managing ministers and other church clergy</p>
            </div>

            <FellowshipComponent
                title=""
                data={transformedMembers as any}
                columns={columns}
                loading={loading}
                error={error}
            />

            {!loading && members.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                    <p className="text-2xl font-bold">No JSS data available</p>
                    <p className="text-sm">Please register new clergy in the "All Members" section.</p>
                </div>
            )}
        </div>
    );
};

export default React.memo(Clergy);