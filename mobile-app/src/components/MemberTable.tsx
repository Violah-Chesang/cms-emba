import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the path to your store
import { fetchMembers } from '../store/slices/memberSlice'; // Adjust the path to your slice

interface Member {
    _id: string;
    memberId: string;
    firstName: string;
    middleName: string;
    surName: string;
    dob: string;
    phone: string;
    physicalAddress: string;
    nationalId: string;
    motherPhone: string;
    fatherName: string;
    motherName: string;
    maritalStatus: string;
    marriageType: string;
    spouseName: string;
    gender: string;
    occupation: string;
    savedStatus: string;
    baptisedStatus: string;
    otherChurchMembership: string;
    memberType: string;
    cellGroup: string;
    ministry: string;
    fellowship: string;
    age: number;
    deleted: boolean;
    isActive: string;
    regDate: string;
    notes: string;
    __v: number;
}

const MemberTable: React.FC = () => {
    const dispatch = useDispatch();
    const { data: members, loading, error } = useSelector((state: RootState) => state.members);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchMembers() as any); // Cast to `any` if type issue persists
    }, [dispatch]);

    const handleToggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleEdit = (id: string) => {
        Alert.alert('Edit', `Edit member with ID ${id}`);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete',
            `Are you sure you want to delete member with ID ${id}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => {
                    // Dispatch delete action here
                    // dispatch(deleteMember(id));
                } },
            ]
        );
    };

    const renderItem = ({ item }: { item: Member }) => (
        <View style={styles.row}>
            <View style={styles.rowContent}>
                <Text style={styles.cell}>{item.firstName} {item.middleName} {item.surName}</Text>
                <Text style={styles.cell}>{item.fellowship}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleToggleExpand(item._id)}
                >
                    <Text style={styles.buttonText}>{expandedId === item._id ? '−' : '+'}</Text>
                </TouchableOpacity>
            </View>
            {expandedId === item._id && (
                <View style={styles.details}>
                    <Text style={styles.detailText}>First Name: {item.firstName}</Text>
                    <Text style={styles.detailText}>Middle Name: {item.middleName}</Text>
                    <Text style={styles.detailText}>Last Name: {item.surName}</Text>
                    <Text style={styles.detailText}>Fellowship: {item.fellowship}</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(item._id)}>
                            <Text style={styles.actionButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item._id)}>
                            <Text style={styles.actionButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>Error: {error}</Text>
            ) : (
                <FlatList
                    data={members}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 5,
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    cell: {
        flex: 1,
    },
    button: {
        padding: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'blue',
    },
    details: {
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    actionButtonText: {
        fontSize: 16,
    },
});

export default MemberTable;
