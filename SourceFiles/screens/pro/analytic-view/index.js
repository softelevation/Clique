import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import HeaderPostLogin from '../../../common/header-post-login';
import {Block, ImageComponent, Text} from '../../../components';
import {hp, wp} from '../../../components/responsive';
import {light} from '../../../components/theme/colors';
import NeuView from '../../../common/neu-element/lib/NeuView';
import {Text as TextSVG} from 'react-native-svg';
import {CustomLineChart} from '../../common/lineChart';
import PieChart from '../../../common/PieChart/index';
import {AvertaBold, t1, t2, w3} from '../../../components/theme/fontsize';

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [120, 180, 120, 150, 100, 140, 95],
    },
  ],
};
const AnalyticsView = () => {
  const chart_wh = 180;
  const series = [125, 125];
  const sliceColor = ['#8562EF', '#CC65C6'];

  const renderDoughnutChart = () => {
    return (
      <Block flex={false} margin={[hp(2), 0, 0]} center>
        <NeuView
          containerStyle={styles.doughnut}
          height={hp(26)}
          color={'#f2f0f7'}
          width={wp(90)}
          borderRadius={16}>
          <Text purple semibold size={14} margin={[t2, 0, 0]} right>
            Last 7 Days
          </Text>
          <Block space="around" row flex={false} center>
            <PieChart
              style={{
                transform: [{rotateX: '180deg'}, {rotateZ: '90deg'}],
              }}
              chart_wh={chart_wh}
              series={series}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.75}
              coverFill={'#f2f0f7'}
            />
            <Text
              style={{position: 'absolute', left: wp(18), bottom: hp(10)}}
              grey
              semibold
              size={22}>
              1.500
            </Text>
            <Text
              style={{position: 'absolute', left: wp(13), bottom: hp(7.5)}}
              grey
              size={18}>
              Connections
            </Text>
            <Block flex={false}>
              <Block flex={false} center row>
                <Block
                  style={{width: 10, height: 10}}
                  color="#8562EF"
                  flex={false}
                  margin={[0, wp(4), 0, 0]}
                />
                <Block flex={false}>
                  <Text grey size={16}>
                    New
                  </Text>
                  <Text grey size={16}>
                    Connections
                  </Text>
                </Block>
              </Block>
              <Block margin={[t1, 0, 0]} flex={false} center row>
                <Block
                  style={{width: 10, height: 10}}
                  color="#CC65C6"
                  margin={[0, wp(4), 0, 0]}
                  flex={false}
                />
                <Block flex={false}>
                  <Text grey size={16}>
                    Already{' '}
                  </Text>
                  <Text grey size={16}>
                    Connected
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </NeuView>
      </Block>
    );
  };
  const renderAnalyticsChart = () => {
    return (
      <Block margin={[hp(2), 0, 0]} flex={false} center>
        <NeuView
          containerStyle={styles.helpView}
          height={hp(29)}
          color={'#f2f0f7'}
          width={wp(90)}
          borderRadius={16}>
          <Text
            style={{alignSelf: 'flex-end'}}
            purple
            semibold
            size={14}
            margin={[t2, w3, t1]}
            right>
            Last 7 Days
          </Text>
          <CustomLineChart
            withOuterLines={false}
            withVerticalLines={false}
            withInnerLines={true}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withShadow={true}
            width={wp(85)} // from react-native
            height={hp(25)}
            transparent
            data={barData}
            chartConfig={{
              strokeWidth: 4, // optional, default 3
              useShadowColorFromDataset: true,
              color: (opacity = 1) => 'url(#grad)',
              labelColor: (opacity = 1) => 'rgba(148, 147, 150, 1)',
              propsForDots: {
                r: '6',
                strokeWidth: '0',
              },
              propsForBackgroundLines: {
                // strokeDasharray: '', // solid background lines with no dashes
              },
              propsForLabels: {
                fontFamily: AvertaBold,
                fontSize: 14,
              },
            }}
            renderDotContent={({x, y, index}) => {
              const val = barData.datasets[0].data[index];
              return (
                <TextSVG
                  key={index}
                  x={x + 20}
                  y={y + 4}
                  fill={light.purple}
                  fontSize="14"
                  fontWeight="normal"
                  textAnchor="middle">
                  {val}
                </TextSVG>
              );
            }}
          />
        </NeuView>
      </Block>
    );
  };
  const renderItem = (title, subtitle, image, height, width) => {
    return (
      <Block
        borderRadius={10}
        padding={[t2]}
        center
        margin={[0, wp(1.5)]}
        linear>
        <Block center row flex={false}>
          <ImageComponent name={image} height={height} width={width} />
          <Text margin={[0, 0, 0, wp(1.5)]} regular size={16} white>
            {title}
          </Text>
        </Block>
        <Text margin={[hp(0.5), 0, 0]} semibold size={24} white>
          {subtitle}
        </Text>
      </Block>
    );
  };
  return (
    <Block linear>
      <SafeAreaView />
      <HeaderPostLogin title="Analytics" />
      <Block
        color={'#F2EDFA'}
        padding={[hp(2), 0]}
        margin={[hp(2), 0, 0]}
        borderTopRightRadius={30}
        borderTopLeftRadius={30}>
        <ScrollView
          contentContainerStyle={{paddingBottom: hp(4)}}
          showsVerticalScrollIndicator={false}>
          <Text grey regular size={16} center>
            Unlock the most advanced digital
          </Text>
          <Text margin={[hp(0.5), 0, 0]} grey regular size={16} center>
            business card in the world
          </Text>
          <Block row flex={false} space="between" margin={[t2, wp(5)]}>
            {renderItem('Views', '2k', 'views_icon', 12, 19)}
            {renderItem('Clicks', '1k', 'clicks_icon', 15, 15)}
            {renderItem('Shares', '50', 'share_icon', 14, 16)}
          </Block>
          {renderAnalyticsChart()}
          {renderDoughnutChart()}
        </ScrollView>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  neoSubContainer: {
    shadowRadius: 3,
    backgroundColor: '#F2F0F7',
    width: wp(90),
    height: hp(8),
    justifyContent: 'center',
    marginTop: hp(1),
  },
  helpView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  doughnut: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: wp(3),
  },
});

export default AnalyticsView;
