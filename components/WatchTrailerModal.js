import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, Modal, Dimensions } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import { Image, Input, Button } from 'react-native-elements';
import YoutubePlayer from 'react-native-youtube-iframe';
import { showMessage } from 'react-native-flash-message';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const WatchTrailerModal = ({ showWatchTrailerModalvalue, hideWatchTrailerModal, trailerData }) => {

    // Evaluating if 2 elements (name and id) are passing
    if (trailerData.length === 2) {
        if (trailerData[1] !== undefined) {
            return (
                <Dialog
                    visible={showWatchTrailerModalvalue}
                    onTouchOutside={() => hideWatchTrailerModal()}
                    dialogStyle={{ borderRadius: 10, backgroundColor: "#011627" }}

                >
                    <View>

                        <View style={{ alignSelf: "center", paddingTop: 20 }}>
                            <YoutubePlayer
                                // ref={playerRef}
                                height={200}
                                width={300}

                                videoId={trailerData[1]}
                                play={true}
                                onChangeState={event => console.log(event)}
                                onReady={() => console.log("ready")}
                                onError={e => console.log(e)}
                                onPlaybackQualityChange={q => console.log(q)}
                                volume={50}
                                playbackRate={1}
                                webViewProps={{ allowsFullscreenVideo: false }}
                                playerParams={{
                                    cc_lang_pref: "us",
                                    controls: 0,
                                    autohide: 1
                                }}


                            />

                            <Button
                                title="CLOSE VIDEO"
                                titleStyle={{ fontWeight: "bold" }}
                                buttonStyle={{ backgroundColor: "red" }}
                                containerStyle={{ alignSelf: "center", width: 300 }}
                                onPress={() => hideWatchTrailerModal()}
                            // icon={<Icon
                            //     name="close"
                            //     size={20}
                            //     color="white"
                            // />}
                            />
                        </View>



                    </View>
                </Dialog>


                // <Dialog
                //     visible={showWatchTrailerModalvalue}
                //     title={trailerData[0]}
                //     onTouchOutside={() => hideWatchTrailerModal()}
                //     dialogStyle={{ borderRadius: 10 }}
                //     titleStyle={{ textAlign: "center" }} >

                //     <View>


                //     </View>


                // </Dialog>
            )
        } else {
            showMessage({
                message: "There's no trailers to show!",
                type: "info",
            })
            hideWatchTrailerModal();
            return (
                <></>
            )
        }
    } else {
        return (
            <></>
        )
    }
}


export default WatchTrailerModal;