import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Camera from '@/components/Camera';
import Photo from '@/components/Photo';
import AdBanner from '@/components/AdBanner';
import { processImage } from '@/services/ocrService';
import { CameraCapturedPicture } from 'expo-camera';
import { Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CameraScreen() {
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const [recognizedData, setRecognizedData] = useState<any[]>([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });
  const { demo } = useLocalSearchParams<{ demo?: string }>();
  const isWebDemo = Platform.OS === 'web' && demo === 'screenshot';

  React.useEffect(() => {
    setRecognizedData([]);
    setPhoto(isWebDemo ? { uri: '/sign.jpg', width: 900, height: 1200 } : undefined);
    if (isWebDemo) {
      setOriginalImageSize({ width: 900, height: 1200 });
      void processImage('/sign.jpg').then(setRecognizedData);
    }
  }, [isWebDemo]);

  const handlePictureTaken = async (photo: CameraCapturedPicture) => {
    setPhoto(photo);
    setOriginalImageSize({ width: photo.width, height: photo.height });

    const recognizedTextData = await processImage(photo.uri);
    setRecognizedData(recognizedTextData);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && (
        <Text accessibilityRole="alert" style={styles.notice}>
          {isWebDemo
            ? 'Screenshot demo: sample sign with canned pinyin. No text recognition is running.'
            : 'Text recognition is available in the native app. Web preview does not recognize photos.'}
        </Text>
      )}
      {Platform.OS === 'web' && !isWebDemo ? null : photo ? (
        <Photo
          photoUri={photo.uri}
          recognizedData={recognizedData}
          imageSize={imageSize}
          originalImageSize={originalImageSize}
          onClose={() => { setPhoto(undefined); setRecognizedData([]); }}
          setImageSize={setImageSize}
        />
      ) : (
        <Camera onPictureTaken={handlePictureTaken} />
      )}
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#111',
    color: 'white',
    padding: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
