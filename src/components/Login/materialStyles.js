import {makeStyles} from "@material-ui/core";

export const loginViewMaterialStyles = makeStyles(theme => ({
    input: {
        borderRadius: 4,
        width: '90%',
        marginBottom: 5,
        marginTop: 10,
    },
    button: {
        margin: theme.spacing(1),
        width: '90%',
        backgroundColor: '#318091',
        color: 'white !important'
    }
}));