import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildContols';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import React from 'react'; 

configure({adapter: new Adapter()}); 

describe('<BurgerBuilder/>', () => {

    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('Should render <BuildControls /> when recieving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1); 
    });
});