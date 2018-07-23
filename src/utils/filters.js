const filterGuardianPeople = (items, selectedItem) => {

    const guardianPeopleIds = items.p2p
        .filter(relation => relation.peopleId === selectedItem.id)
        .map(relation => ({id: relation.guardianId, relation: relation.relation}));

    const guardianPeople = items.people
        .filter(person => guardianPeopleIds
            .some(guardianPeopleId => guardianPeopleId.id === person.id))
        .map(person => {
            let result = {};
            guardianPeopleIds.map(guardianPeopleId => {
                if (person.id === guardianPeopleId.id) {
                    result = {...person, relation: guardianPeopleId.relation}
                }
            });

            return result;
        });

    return guardianPeople;
};

const filterDependantPeople = (items, selectedItem) => {

    const dependantPeopleIds = items.p2p
        .filter(relation => relation.guardianId === selectedItem.id)
        .map(relation => ({id: relation.peopleId}));

    const dependantPeople = items.people
        .filter(person => dependantPeopleIds
            .some(dependantPeopleId => dependantPeopleId.id === person.id));

    return dependantPeople;
};

const filterContainerGroupsForPeople = (items, selectedItem) => {

    const groupsAboveIds = items.p2g
        .filter(relation => relation.peopleId === selectedItem.id)
        .map(relation => relation.groupId);


    const groupsAbove = items.groups
        .filter(group => groupsAboveIds
            .some(groupAboveId => groupAboveId === group.id));

    return groupsAbove;
};

const filterContainedGroups = (items, selectedItem) => {

    const groupsBelowIds = items.g2g
        .filter(relation => relation.containerGroupId === selectedItem.id)
        .map(relation => relation.containedGroupId);

    const groupsBelow = items.groups
        .filter(group => groupsBelowIds
            .some(groupBelowId => groupBelowId === group.id));

    return groupsBelow;

};

const filterContainerGroupsForGroup = (items, selectedItem) => {

    const groupsAboveIds = items.g2g
        .filter(relation => relation.containedGroupId === selectedItem.id)
        .map(relation => relation.containerGroupId);

    const groupsAbove = items.groups
        .filter(group => groupsAboveIds
            .some(groupAboveId => groupAboveId === group.id));

    return groupsAbove;
};

const filterContainedPeople = (items, selectedItem) => {

    const peopleBelowIds = items.p2g
        .filter(relation => relation.groupId === selectedItem.id)
        .map(relation => ({id: relation.peopleId, relation: relation.relation}));

    const peopleBelow = items.people
        .filter(person => peopleBelowIds
            .some(personBelowId => personBelowId.id === person.id))
        .map(person => {
            let result = {};
            peopleBelowIds.map(personBelowId => {
                if (person.id === personBelowId.id) {
                    result = {...person, relation: personBelowId.relation}
                }
            });

            return result;
        });

    return peopleBelow;
};

export default  {
    filterContainedGroups,
    filterContainerGroupsForGroup,
    filterContainerGroupsForPeople,
    filterDependantPeople,
    filterGuardianPeople,
    filterContainedPeople
}



