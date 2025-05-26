/*import { Image, StyleSheet, View, ImageSourcePropType} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface FadeImageProps{
    source: ImageSourcePropType;
    colors: string[];
}
const FadeImage: React.FC<FadeImageProps> =  ({source,colors}) =>{
    return(
    <MaskedView
        style={{flex:1}}
        maskElement={
        <LinearGradient
            colors={colors}
         style={styles.gradient}
        start = {{x:0,y:0}}
        end={{x:0,y:1}}
        />
        }
    >
        <Image source={source} style={styles.image}/>
    </MaskedView>
    );
};

const styles= StyleSheet.create({
    image:{
        flex:1,
        width:'100%',
        resizeMode:'cover',
    },
    gradient: {
        flex:1,
    },

})

export default FadeImage;

*/