export default function useCheckGuards(guardsToBeChecked) {

    const checkGuards = () => {
        const { availableGuards } = usePermissions();
        const guardsToBeCheckedArray = guardsToBeChecked.split(',');
        const hasViewPermission = ref(false);
        const hasCreatePermission = ref(false);
        const hasEditPermission = ref(false);
        const hasDeletePermission = ref(false);

        for (let i = 0; i < guardsToBeCheckedArray.length; i++) {
            const guardLastText = guardsToBeCheckedArray[i].split('_').pop();
            if (availableGuards.includes(guardsToBeCheckedArray[i])) {
                guardLastText == 'view' ? hasViewPermission.value = true : '';
                guardLastText == 'create' ? hasCreatePermission.value = true : '';
                guardLastText == 'edit' ? hasEditPermission.value = true : '';
                guardLastText == 'delete' ? hasDeletePermission.value = true : '';
            }
        }

        return {
            hasViewPermission,
            hasCreatePermission,
            hasEditPermission,
            hasDeletePermission
        }
    }

    return {
        checkGuards
    };
}
