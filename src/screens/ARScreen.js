import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingStateConstants,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  Viro3DObject,
  ViroAnimations,
  ViroDirectionalLight
} from '@reactvision/react-viro';
asdfghgfdsa

// This is the actual AR Scene that runs inside the ViroARSceneNavigator
const MonumentARScene = (props) => {
  const { monument } = props.sceneNavigator.viroAppProps;
  const [text, setText] = React.useState('Initializing AR...');
  const [scale, setScale] = React.useState(monument.initialScale || [0.2, 0.2, 0.2]);
  const [rotation, setRotation] = React.useState([0, 0, 0]);

  const onInitialized = (state, reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText(`Point camera at a flat surface to place ${monument.name}`);
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      setText('Loss of tracking');
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Better lighting: Directional lights are much better for colourful 3D models than SpotLights! */}
      <ViroAmbientLight color={"#ffffff"} intensity={2000} />
      <ViroDirectionalLight color="#ffffff" direction={[0, -1, -.2]} />
      <ViroDirectionalLight color="#ffffff" direction={[0, 0, -1]} />

      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />

      {/* Fully Interactive Node: Drag, Pinch to Zoom, Rotate with two fingers! */}
      <ViroNode
        position={[0, -1, -2]}
        dragType="FixedToWorld"
        onDrag={() => { }}
        onPinch={(pinchState, scaleFactor, source) => {
          if (pinchState === 3) {
            let newScale = scale[0] * scaleFactor;
            setScale([newScale, newScale, newScale]);
          }
        }}
        onRotate={(rotateState, rotationFactor, source) => {
          if (rotateState === 3) {
            setRotation([rotation[0], rotation[1] + rotationFactor, rotation[2]]);
          }
        }}
      >
        <Viro3DObject
          source={monument.model}
          position={[0, 0, 0]}
          scale={scale} // Controlled by pinch gesture
          rotation={rotation} // Controlled by rotate gesture
          type="GLB"
          onLoadStart={() => console.log(`DEBUG: Viro3DObject - onLoadStart Triggered for ${monument.name}!`)}
          onLoadEnd={() => console.log(`DEBUG: Viro3DObject - onLoadEnd Triggered! ${monument.name} is ready.`)}
          onError={(e) => console.log(`DEBUG: Viro3DObject - onError Triggered! ERROR:`, e.nativeEvent.error)}
        />
      </ViroNode>
    </ViroARScene>
  );
};

export default function ARScreen({ route, navigation }) {
  const { monument } = route.params;

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        key={monument.id} // Forces the AR engine to completely reset for each monument!
        autofocus={true}
        initialScene={{
          scene: MonumentARScene,
        }}
        viroAppProps={{ monument }}
        style={styles.f1}
      />

      {/* UI Overlay on top of AR Camera */}
      <SafeAreaView style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.monumentName}>{monument.name}</Text>
        </View>
        <View style={styles.bottomBar}>
          <Text style={styles.instructions}>
            Move your phone to detect a surface. Tap the surface to place the 3D model!
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Define materials and animations
ViroMaterials.createMaterials({
  grid: {
    diffuseColor: '#3182CE',
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 2500,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  f1: {
    flex: 1,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    pointerEvents: 'box-none', // Let touches pass through to AR view unless hitting UI
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  monumentName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  bottomBar: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  instructions: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
});
