import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './FormInput.css';
import { Container } from 'react-bootstrap';

const useStyles = makeStyles({
    root: {
        height: 300,
    },
});

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 20,
        label: '1',
    },
    {
        value: 40,
        label: '2',
    },
    {
        value: 60,
        label: '3',
    },
    {
        value: 80,
        label: '4',
    },
    {
        value: 100,
        label: '5',
    },
];


function valuetext(value) {
    return `${value}`;
}

export function VerticalSlider(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography id="vertical-slider" gutterBottom>
                {props.tag}
            </Typography>
            <div className={classes.root}>
                <Slider
                    orientation="vertical"
                    defaultValue={0}
                    aria-labelledby="vertical-slider"
                    getAriaValueText={valuetext}
                    marks={marks}
                    step={20}
                />
            </div>
        </React.Fragment>
    );
}

class FormInput extends React.Component {

    state = {
        Lang: null,
        Age: null,
        Viol: null,
        Ad: null,
        selectedVideo: this.props.thisVideo
    };

    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    onFormSubmit = (event) => {
        event.preventDefault();
        // console.log(this.myRef.current);
        // this.setState({
        //     selectedVideo: this.props.thisVideo
        // })
        console.log("Selected Video: ", this.state.selectedVideo);
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <Container>
                <form className="form" onSubmit={this.onFormSubmit}>
                    {/* Language */}
                    <div className="Language radio-group">
                        Lang
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="ENG"
                                    checked={this.state.Lang === 'ENG'}
                                    onChange={this.onValueChange}
                                    name="Lang"
                                />

                                    ENG
                                </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="GER"
                                    checked={this.state.Lang === 'GER'}
                                    onChange={this.onValueChange}
                                    name="Lang"
                                />
                                    GER
                                </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="other"
                                    checked={this.state.Lang === 'other'}
                                    onChange={this.onValueChange}
                                    name="Lang"
                                />
                                    other
                                </label>
                        </div>
                    </div>

                    {/* Age Group */}
                    <div className="Age radio-group">
                        Age
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="1"
                                    checked={this.state.Age === '1'}
                                    onChange={this.onValueChange}
                                    name="Age"
                                />
                                1-2
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="2"
                                    checked={this.state.Age === '2'}
                                    onChange={this.onValueChange}
                                    name="Age"
                                />
                                2-3
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="3"
                                    checked={this.state.Age === '3'}
                                    onChange={this.onValueChange}
                                    name="Age"
                                />
                                3-4
                            </label>
                        </div>
                    </div>
                    {/* Viol Group */}
                    <div className="Violence radio-group">
                        Violence
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="0"
                                    checked={this.state.Viol === '0'}
                                    onChange={this.onValueChange}
                                    name="Viol"
                                />
                                0
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="1"
                                    checked={this.state.Viol === '1'}
                                    onChange={this.onValueChange}
                                    name="Viol"
                                />
                                1
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="2"
                                    checked={this.state.Viol === '2'}
                                    onChange={this.onValueChange}
                                    name="Viol"
                                />
                                2
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="3"
                                    checked={this.state.Viol === '3'}
                                    onChange={this.onValueChange}
                                    name="Viol"
                                />
                                3
                            </label>
                        </div>
                    </div>

                    {/* Ad Group */}
                    <div className="Ad radio-group">
                        Advertising
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="0"
                                    checked={this.state.Ad === '0'}
                                    onChange={this.onValueChange}
                                    name="Ad"
                                />
                                0
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="1"
                                    checked={this.state.Ad === '1'}
                                    onChange={this.onValueChange}
                                    name="Ad"
                                />
                                1
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="2"
                                    checked={this.state.Ad === '2'}
                                    onChange={this.onValueChange}
                                    name="Ad"
                                />
                                2
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    value="3"
                                    checked={this.state.Ad === '3'}
                                    onChange={this.onValueChange}
                                    name="Ad"
                                />
                                3
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button className="btn btn-light btn-outline-primary" type="submit">
                        Submit all input
                </button>
                </form>
            </Container>
        );
    }
}

export default FormInput;